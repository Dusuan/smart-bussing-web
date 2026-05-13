import { Box, TextField, Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import BottonRobado from "./bottonRobado";
import { supabase } from "../supabaseClient";

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "13px",
  },
};

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
        "http://smart-bussing-back-production.up.railway.app/api/v1/registrarLugar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
    <div style={{ backgroundColor: "#FFFFFF", width: "795px", minHeight: "493px", border: "1px solid #C3C3C3" }} className="rounded-lg m-2">
      <Box component="form" onSubmit={handleSubmit} className="justify-center px-10 pt-8 pb-2">
        <Stack spacing={0} className="pt-2">
          <div className="flex gap-[22px] w-full" style={{ marginBottom: "22px" }}>
            <TextField label="Empresa" name="nombreEmpresa" fullWidth required variant="outlined" size="medium" value={formData.nombreEmpresa} onChange={handleChange} sx={fieldSx} />
            <TextField label="Nombre Lugar" name="nombreLugar" fullWidth required variant="outlined" size="medium" value={formData.nombreLugar} onChange={handleChange} sx={fieldSx} />
          </div>
          <div style={{ marginBottom: "22px" }}>
            <TextField label="Email de la empresa" name="correo_empresa" type="email" fullWidth required variant="outlined" size="medium" value={formData.correo_empresa} onChange={handleChange} sx={fieldSx} />
          </div>
          <div style={{ marginBottom: "22px" }}>
            <TextField label="Número Telefónico" name="telefono" fullWidth required variant="outlined" size="medium" value={formData.telefono} onChange={handleChange} sx={fieldSx} />
          </div>
          <div style={{ marginBottom: "22px" }}>
            <TextField label="Descripción del lugar" name="descripcion" multiline rows={4} fullWidth required variant="outlined" size="medium" value={formData.descripcion} onChange={handleChange} sx={fieldSx} />
          </div>

          {/* Subida de Imágenes */}
          <div className="flex flex-col gap-4 mt-2 items-center" style={{ marginBottom: "22px" }}>
            <div className="flex flex-col items-center">
              <Typography variant="body2" color="textSecondary" mb={1}>
                Logo de la empresa (Obligatorio)
              </Typography>
              <label
                htmlFor="logo-upload"
                className="flex items-center justify-center text-base px-8 h-12 rounded-[13px] bg-[#5F93A2] hover:bg-[#4a7d8c] text-white transition-colors duration-200 cursor-pointer"
              >
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
                <span className="text-xs text-gray-500 mt-1">{logo.name}</span>
              )}
            </div>

            <div className="flex flex-col items-center">
              <Typography variant="body2" color="textSecondary" mb={1}>
                Fotos del lugar (Opcional, múltiples permitidas)
              </Typography>
              <label
                htmlFor="fotos-upload"
                className="flex items-center justify-center text-base px-8 h-12 rounded-[13px] bg-[#5F93A2] hover:bg-[#4a7d8c] text-white transition-colors duration-200 cursor-pointer"
              >
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

          <div onClick={!isUploading ? handleSubmit : undefined} className="flex justify-center items-center mt-4 mb-8 cursor-pointer">
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
