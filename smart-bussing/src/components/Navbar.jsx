import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import Logo from "../assets/smartbussing-logo.svg";
import BurgerMenu from "../assets/burger-menu.svg";

const navItems = [
    { label: "Descarga", href: "#mobile-download" },
    { label: "Contacto", href: "#mobile-register" },
];

const linkStyle = {
    fontSize: "22px",
    color: "#4B4B4B",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 700,
};

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <nav className="py-3 z-50 border-b bg-white border-neutral-200 shadow-lg">
            <div className="container px-4 py-1 mx-auto flex items-center justify-between relative text-[#5F93A2]">
                <img src={Logo} alt="Logo" className="w-[130px] h-[44px] md:w-[189px] md:h-[63px]" />

                {/* Desktop links — visible from md up */}
                <ul className="hidden md:flex space-x-12">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} style={linkStyle}>{item.label}</a>
                        </li>
                    ))}
                </ul>

                {/* Mobile menu button — visible below md */}
                <div className="md:hidden">
                    <button
                        onClick={handleOpen}
                        className="bg-[#5F93A2] hover:bg-[#4a7d8c] rounded-[20px] px-4 h-[42px] flex items-center gap-2 shadow-lg cursor-pointer transition-colors duration-300 text-white font-bold"
                    >
                        <img src={BurgerMenu} alt="" className="w-5 h-5 invert" />
                        Menú
                    </button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        {navItems.map((item) => (
                            <MenuItem key={item.label} onClick={handleClose}>
                                <a href={item.href} style={{ ...linkStyle, fontSize: "18px" }}>
                                    {item.label}
                                </a>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
