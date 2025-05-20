import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import BottonRobado from "./bottonRobado";
export default function ProximamenteForm() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("https://smart-bussing-back.onrender.com/api/v1/interesado", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(JSON.stringify(formData));
    setFormData({
      email: "",
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
          <div className="flex items-center">
            <div item xs={12} sm={6} md={6} className="pr-1">
              <TextField
                label="Correo"
                name="email"
                type="email"
                fullWidth
                required
                variant="outlined"
                size="small"
                value={formData.Correo}
                onChange={handleChange}
                sx={{}}
              />
            </div>

            <div onClick={handleSubmit} className="justify-center items-center "item xs={12}>
             < BottonRobado />
            </div>
          </div>
        </Stack>
      </Box>
    </div>
  );
}
