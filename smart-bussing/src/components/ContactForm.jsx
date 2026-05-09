import { Box, TextField, Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import BottonRobado from "./bottonRobado";
import { supabase } from "../supabaseClient";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    correo_empresa: "",
    nombreLugar: "",
    telefono: "",
    descripcion: "",
  });

  const [logo, setLogo] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };

  const handleFotosChange = (e) => {
    if (e.target.files) {
      setFotos((prevFotos) => [...prevFotos, ...Array.from(e.target.files)]);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!logo) {
      alert("El logo es obligatorio.");
      return;
    }

    setIsUploading(true);

    try {
      let urlFiles = [];

      // 1. Upload Logo
      const logoExt = logo.name.split(".").pop();
      const logoFileName = `logo-${Date.now()}.${logoExt}`;
      const { error: logoError } = await supabase.storage
        .from("lugar")
        .upload(logoFileName, logo);

      if (logoError) throw logoError;

      const { data: logoUrlData } = supabase.storage
        .from("lugar")
        .getPublicUrl(logoFileName);
      urlFiles.push(logoUrlData.publicUrl);

      // 2. Upload Fotos
      for (const foto of fotos) {
        const fotoExt = foto.name.split(".").pop();
        const fotoFileName = `foto-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fotoExt}`;
        const { error: fotoError } = await supabase.storage
          .from("lugar")
          .upload(fotoFileName, foto);

        if (fotoError) throw fotoError;

        const { data: fotoUrlData } = supabase.storage
          .from("lugar")
          .getPublicUrl(fotoFileName);
        urlFiles.push(fotoUrlData.publicUrl);
      }

      // 3. Send to backend
      const finalData = { ...formData, urlFiles };

      const response = await fetch(
        "https://smart-bussing-back.onrender.com/api/v1/registrarLuga",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (response.ok) {
        alert("Se han registrado el lugar y la empresa con éxito");
        setFormData({
          nombreEmpresa: "",
          correo_empresa: "",
          nombreLugar: "",
          telefono: "",
          descripcion: "",
        });
        setLogo(null);
        setFotos([]);
        // Clear file inputs
        document.getElementById("logo-upload").value = "";
        document.getElementById("fotos-upload").value = "";
      } else {
        alert(`Hubo un error en el sistema: ${response.status}`);
      }
    } catch (error) {
      console.error("Error en la subida:", error);
      alert("Hubo un error al subir las imágenes o registrar los datos.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF" }} className="rounded-lg m-2">
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="justify-center p-6"
      >
        <Stack spacing={2} className="pt-2">
          <div className="flex">
            <div item xs={12} sm={6} md={6} className="pr-1 flex-1">
              <TextField
                label="Empresa"
                name="nombreEmpresa"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={formData.nombreEmpresa}
                onChange={handleChange}
              />
            </div>
            <div item xs={12} sm={6} md={6} className="pl-1 flex-1">
              <TextField
                label="Nombre Lugar"
                name="nombreLugar"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={formData.nombreLugar}
                onChange={handleChange}
              />
            </div>
          </div>

          <div item xs={12} sm={6} md={6}>
            <TextField
              label="Email de la empresa"
              name="correo_empresa"
              type="email"
              fullWidth
              required
              variant="outlined"
              size="small"
              value={formData.correo_empresa}
              onChange={handleChange}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </div>
          <div item xs={12} sm={6} md={6}>
            <TextField
              label="Número Telefónico"
              name="telefono"
              fullWidth
              required
              variant="outlined"
              size="small"
              value={formData.telefono}
              onChange={handleChange}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </div>
          <div item xs={12} sm={6} md={6}>
            <TextField
              label="Descripción del lugar"
              name="descripcion"
              multiline
              rows={4}
              fullWidth
              required
              variant="outlined"
              size="small"
              value={formData.descripcion}
              onChange={handleChange}
              sx={{ backgroundColor: "#ffffff" }}
            />
          </div>

          {/* Subida de Imágenes */}
          <div className="flex flex-col gap-4 mt-2 items-center">
            <div className="flex flex-col items-center">
              <Typography variant="body2" color="textSecondary" mb={1}>
                Logo de la empresa (Obligatorio)
              </Typography>
              <label
                htmlFor="logo-upload"
                className="flex items-center justify-center text-sm px-6 h-10 rounded bg-[#3B7C5F] text-white relative overflow-hidden group z-10 hover:text-white duration-1000 cursor-pointer"
              >
                <span className="absolute bg-emerald-600 w-64 h-64 rounded-full -z-10 -left-10 -top-10 origin-center transform transition-all scale-0 group-hover:scale-100 duration-500"></span>
                <span className="absolute bg-emerald-800 w-64 h-64 -left-10 -top-10 rounded-full -z-10 origin-center transform transition-all scale-0 group-hover:scale-100 duration-700"></span>
                Seleccionar Logo
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                required
                className="hidden"
              />
              {logo && (
                <span className="text-xs text-gray-500 mt-1">
                  {logo.name}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center">
              <Typography variant="body2" color="textSecondary" mb={1}>
                Fotos del lugar (Opcional, múltiples permitidas)
              </Typography>
              <label
                htmlFor="fotos-upload"
                className="flex items-center justify-center text-sm px-6 h-10 rounded bg-[#3B7C5F] text-white relative overflow-hidden group z-10 hover:text-white duration-1000 cursor-pointer"
              >
                <span className="absolute bg-emerald-600 w-64 h-64 rounded-full -z-10 -left-10 -top-10 origin-center transform transition-all scale-0 group-hover:scale-100 duration-500"></span>
                <span className="absolute bg-emerald-800 w-64 h-64 -left-10 -top-10 rounded-full -z-10 origin-center transform transition-all scale-0 group-hover:scale-100 duration-700"></span>
                Elegir Fotos
              </label>
              <input
                id="fotos-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFotosChange}
                className="hidden"
              />
              {fotos.length > 0 && (
                <span className="text-xs text-gray-500 mt-1">
                  {fotos.length} archivo(s) seleccionado(s)
                </span>
              )}
            </div>
          </div>

          <div onClick={!isUploading ? handleSubmit : undefined} className="justify-center items-center mt-4 cursor-pointer flex" item xs={12}>
            {isUploading ? (
              <Button disabled variant="contained" className="w-full h-[40px]">
                <CircularProgress size={24} />
              </Button>
            ) : (
              <BottonRobado />
            )}
          </div>
        </Stack>
      </Box>
    </div>
  );
};

export default ContactForm;
