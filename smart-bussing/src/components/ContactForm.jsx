import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import BottonRobado from "./bottonRobado";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombreEmpresa: "",
    correo_empresa: "",
    nombreLugar: "",
    telefono: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://smart-bussing-back.onrender.com/api/v1/registrarLugar", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if(response.ok){
      alert("Se han registrado el ligar y la empresa con exito")
    }

    else{
      alert("Hubo un error en el sistema", response.status)
    }


    console.log(JSON.stringify(formData));
    setFormData({
      nombreEmpresa: "",
      correo_empresa: "",
      nombreLugar: "",
      telefono: "",
      descripcion: "",
    });
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
            <div item xs={12} sm={6} md={6} className="pr-1">
              <TextField
                label="Empresa"
                name="nombreEmpresa"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={formData.nombreEmpresa}
                onChange={handleChange}
                sx={{}}
              />
            </div>
            <div item xs={12} sm={6} md={6} className="pl-1">
              <TextField
                label="Nombre Lugar"
                name="nombreLugar"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={formData.nombreLugar}
                onChange={handleChange}
                sx={{}}
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
              sx={{
                backgroundColor: "#ffffff",
              }}
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
              sx={{
                backgroundColor: "#ffffff",
              }}
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
              sx={{
                backgroundColor: "#ffffff",
              }}
            />
          </div>

          <div onClick={handleSubmit} className="justify-center items-center" item xs={12}>
           <BottonRobado />
          </div>
        </Stack>
      </Box>
    </div>
  );
};

export default ContactForm;
