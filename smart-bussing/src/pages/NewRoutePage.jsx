import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Snackbar, Alert, CircularProgress } from "@mui/material";

export default function NewRoutePage() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      route: {
        route_id: "",
        route_short_name: "",
        route_long_name: "",
        route_color: "#34D399",
        route_text_color: "#065F46",
        route_type: "microbus",
        coordinates: "[\n  [-116.6060, 31.8665],\n  [-116.6080, 31.8620]\n]",
      },
      stops: [
        {
          stop_id: "ST001",
          stop_name: "",
          stop_description: "",
          coordinates: "-116.6060, 31.8665",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stops",
  });

  const watchAllFields = watch();

  const handleJSONImport = (jsonText) => {
    try {
      const parsed = JSON.parse(jsonText);
      if (parsed.type !== "FeatureCollection" || !Array.isArray(parsed.features)) return;

      const routeFeature = parsed.features.find(f => f.properties?.feature_type === "route");
      const stopFeatures = parsed.features.filter(f => f.properties?.feature_type === "stop");

      if (routeFeature) {
        setValue("route.route_id", routeFeature.properties.route_id || "");
        setValue("route.route_short_name", routeFeature.properties.route_short_name || "");
        setValue("route.route_long_name", routeFeature.properties.route_long_name || "");
        setValue("route.route_color", routeFeature.properties.route_color || "#34D399");
        setValue("route.route_text_color", routeFeature.properties.route_text_color || "#065F46");
        setValue("route.route_type", routeFeature.properties.route_type || "microbus");
        if (routeFeature.geometry?.coordinates) {
          setValue("route.coordinates", JSON.stringify(routeFeature.geometry.coordinates, null, 2));
        }
      }

      const newStops = stopFeatures.map(stop => ({
        stop_id: stop.properties?.stop_id || "",
        stop_name: stop.properties?.stop_name || "",
        stop_description: stop.properties?.stop_description || "",
        coordinates: stop.geometry?.coordinates ? stop.geometry.coordinates.join(", ") : ""
      }));

      setValue("stops", newStops);
    } catch (e) {
      // ignore invalid json during typing or paste
    }
  };

  const generateFeatureCollection = (data) => {
    try {
      let routeCoords = [];
      try {
        routeCoords = JSON.parse(data.route.coordinates);
      } catch (e) {
        throw new Error("Invalid Route Coordinates JSON format");
      }

      const features = [];

      // Add Route Feature
      features.push({
        type: "Feature",
        id: `route-${data.route.route_id}`,
        geometry: {
          type: "LineString",
          coordinates: routeCoords,
        },
        properties: {
          feature_type: "route",
          route_id: data.route.route_id,
          route_short_name: data.route.route_short_name,
          route_long_name: data.route.route_long_name,
          route_color: data.route.route_color,
          route_text_color: data.route.route_text_color,
          route_type: data.route.route_type,
        },
      });

      // Add Stop Features
      if (Array.isArray(data.stops)) {
        data.stops.forEach((stop) => {
          let stopCoords = [0, 0];
          try {
            const parts = stop.coordinates.split(",").map((s) => parseFloat(s.trim()));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
              stopCoords = parts;
            } else {
              throw new Error();
            }
          } catch (e) {
            throw new Error(`Invalid Coordinates format for stop ${stop.stop_id}`);
          }

          features.push({
            type: "Feature",
            id: `stop-${stop.stop_id}`,
            geometry: {
              type: "Point",
              coordinates: stopCoords,
            },
            properties: {
              feature_type: "stop",
              stop_id: stop.stop_id,
              stop_name: stop.stop_name,
              stop_description: stop.stop_description,
              routes: [data.route.route_short_name],
            },
          });
        });
      }

      return {
        type: "FeatureCollection",
        features: features,
      };
    } catch (error) {
      return { error: error.message };
    }
  };

  const onSubmit = async (data) => {
    setToast({ open: true, message: "Generando y enviando...", severity: "info" });
    const payload = generateFeatureCollection(data);

    if (payload.error) {
      setToast({ open: true, message: payload.error, severity: "error" });
      return;
    }

    try {
      const response = await fetch("https://smart-bussing-back.onrender.com/api/v1/ruta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setToast({ open: true, message: "Ruta creada exitosamente!", severity: "success" });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        const errText = await response.text();
        setToast({ open: true, message: `Error del servidor: ${response.status} ${errText}`, severity: "error" });
      }
    } catch (error) {
      setToast({ open: true, message: `Error de red: ${error.message}`, severity: "error" });
    }
  };

  const onError = (errors) => {
    setToast({ open: true, message: "Por favor, completa todos los campos requeridos. Revisa el formulario.", severity: "warning" });
  };

  const previewJSON = generateFeatureCollection(watchAllFields);

  const inputClasses = "w-full px-3 py-2 bg-white/90 border border-[#BAC5B3] rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#3B7C5F]";
  const labelClasses = "block text-sm font-semibold text-white mb-1 mt-3 text-outline-sm shadow-black";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BAC5B3] to-[#9EBC8A] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Form Section */}
        <div className="lg:w-2/3 bg-[#66745d]/90 p-6 rounded-xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-outline-sm">Crear Nueva Ruta</h1>
            <button 
              onClick={() => navigate("/dashboard")}
              className="bg-[#3B7C5F] hover:bg-[#2A5E46] text-white px-4 py-2 rounded transition-colors"
            >
              Volver
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
            
            {/* Route Details */}
            <div className="bg-[#BAC5B3]/20 p-5 rounded-lg border border-[#BAC5B3]/50">
              <h2 className="text-2xl font-bold border-b border-[#BAC5B3]/50 pb-2 mb-4 text-outline-sm">Detalles de la Ruta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>ID de Ruta (ej. 104)</label>
                  <input {...register("route.route_id", { required: true })} className={inputClasses} placeholder="104" />
                </div>
                <div>
                  <label className={labelClasses}>Nombre Corto (ej. 104)</label>
                  <input {...register("route.route_short_name", { required: true })} className={inputClasses} placeholder="104" />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Nombre Largo (ej. Centro - Villas)</label>
                  <input {...register("route.route_long_name", { required: true })} className={inputClasses} placeholder="Centro - Villas" />
                </div>
                <div>
                  <label className={labelClasses}>Color (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" {...register("route.route_color")} className="h-10 w-10 p-0 border-0 rounded cursor-pointer" />
                    <input {...register("route.route_color", { required: true })} className={inputClasses} />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Color de Texto (Hex)</label>
                  <div className="flex gap-2">
                    <input type="color" {...register("route.route_text_color")} className="h-10 w-10 p-0 border-0 rounded cursor-pointer" />
                    <input {...register("route.route_text_color", { required: true })} className={inputClasses} />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Coordenadas de la Ruta (Array JSON de [lon, lat])</label>
                  <textarea 
                    {...register("route.route_coordinates")} 
                    {...register("route.coordinates", { required: true })} 
                    className={`${inputClasses} h-32 font-mono text-sm`}
                  />
                </div>
              </div>
            </div>

            {/* Stops Details */}
            <div className="bg-[#BAC5B3]/20 p-5 rounded-lg border border-[#BAC5B3]/50">
              <div className="flex justify-between items-center border-b border-[#BAC5B3]/50 pb-2 mb-4">
                <h2 className="text-2xl font-bold text-outline-sm">Paradas (Stops)</h2>
                <button 
                  type="button" 
                  onClick={() => append({ stop_id: "", stop_name: "", stop_description: "", coordinates: "" })}
                  className="bg-[#3B7C5F] hover:bg-[#2A5E46] text-white px-3 py-1 text-sm rounded transition-colors"
                >
                  + Agregar Parada
                </button>
              </div>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="relative p-4 bg-black/10 rounded-md border border-[#BAC5B3]/30">
                    <button 
                      type="button" 
                      onClick={() => remove(index)}
                      className="absolute top-2 right-2 text-red-300 hover:text-red-500 font-bold"
                    >
                      ✕
                    </button>
                    <h3 className="font-bold mb-2">Parada #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>ID Parada (ej. ST001)</label>
                        <input {...register(`stops.${index}.stop_id`, { required: true })} className={inputClasses} />
                      </div>
                      <div>
                        <label className={labelClasses}>Coordenadas (lon, lat)</label>
                        <input {...register(`stops.${index}.coordinates`, { required: true })} className={inputClasses} placeholder="-116.6060, 31.8665" />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Nombre de Parada</label>
                        <input {...register(`stops.${index}.stop_name`, { required: true })} className={inputClasses} />
                      </div>
                      <div className="md:col-span-2">
                        <label className={labelClasses}>Descripción</label>
                        <input {...register(`stops.${index}.stop_description`)} className={inputClasses} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center gap-2 bg-[#3B7C5F] hover:bg-[#2A5E46] text-white font-bold text-xl py-4 rounded-lg shadow-lg transition-transform transform ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.01]'}`}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={24} color="inherit" />
                  <span>Enviando...</span>
                </>
              ) : (
                "Generar y Enviar Ruta"
              )}
            </button>
          </form>
        </div>

        {/* JSON Preview Section */}
        <div className="lg:w-1/3">
          <div className="sticky top-8 bg-[#2A3426] p-6 rounded-xl shadow-xl flex flex-col h-[calc(100vh-4rem)]">
            <h2 className="text-xl font-bold mb-4 text-[#BAC5B3]">Vista Previa JSON</h2>
            <div className="flex-1 overflow-auto bg-[#1A2218] p-4 rounded-lg border border-[#3B7C5F]">
              <textarea 
                className="w-full h-full bg-transparent text-xs font-mono text-[#A8C7A1] resize-none focus:outline-none whitespace-pre-wrap break-words"
                value={previewJSON.error ? `Error en JSON: ${previewJSON.error}` : JSON.stringify(previewJSON, null, 2)}
                onChange={(e) => handleJSONImport(e.target.value)}
                placeholder="Pega tu JSON aquí para cargar los datos..."
              />
            </div>
          </div>
        </div>

      </div>

      <Snackbar 
        open={toast.open} 
        autoHideDuration={6000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%', fontSize: '1.1rem' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
