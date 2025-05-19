import Logo from "../assets/smart-bussing-logo.svg";

const NavItems = [
    {label: "Descarga", href: "#download"},
    {label: "Contacto", href: "#register"},
];

const Navbar = () => {
    return (
        <nav className="py-3 z-50 border-b bg-[#fcfcf1] border-neutral-200 shadow-lg">
            <div className="container px-4 py-1 mx-auto flex items-center justify-between relative text-[#3B7C5F]">
                <div>
                    <img src={Logo} alt="Logo" className="w-[80px]"/>
                </div>
                <div className="text-2xl">
                    <ul className="flex space-x-12">
                        {NavItems.map((item, index) => (
                            <li className="text-sm  md:text-4xl" key={index}>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar