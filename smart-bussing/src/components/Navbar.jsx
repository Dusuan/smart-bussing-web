import Logo from "../assets/smartbussing-logo.svg";

const isMobile = window.innerWidth <= 768;

const NavItems = isMobile
    ? [
            { label: "Descarga", href: "#mobile-download" },
            { label: "Contacto", href: "#mobile-register" },
        ]
    : [
            { label: "Descarga", href: "#" },
            { label: "Contacto", href: "#register" },
        ];

const Navbar = () => {
    return (
        <nav className="py-3 z-50 border-b bg-white border-neutral-200 shadow-lg">
            <div className="container px-4 py-1 mx-auto flex items-center justify-between relative text-[#5F93A2]">
                <div>
                    <img src={Logo} alt="Logo" className="w-[189px] h-[63px]"/>
                </div>
                <div>
                    <ul className="flex space-x-12">
                        {NavItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.href} style={{ fontSize: "22px", color: "#4B4B4B", fontFamily: "Roboto, sans-serif", fontWeight: 700 }}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
