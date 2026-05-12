import { Box, TextField, Stack } from "@mui/material";
import { useState } from "react";
import BottonRobado from "./bottonRobado";

export default function ProximamenteForm() {
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://smart-bussing-back.onrender.com/api/v1/interesado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("El registro se realizo exitosamente");
    } else {
      alert("Hubo una falla en el sistema", response.status);
    }

    setFormData({ email: "" });
  }

  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #C3C3C3" }} className="rounded-lg m-2">
      <Box component="form" onSubmit={handleSubmit} className="justify-center p-6">
        <Stack spacing={2} className="pt-2">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TextField
              label="Correo"
              name="email"
              type="email"
              fullWidth
              required
              variant="outlined"
              size="small"
              value={formData.email}
              onChange={handleChange}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "13px" } }}
            />
            <div onClick={handleSubmit} style={{ display: "flex", justifyContent: "center" }}>
              <BottonRobado />
            </div>
          </div>
        </Stack>
      </Box>
    </div>
  );
}
