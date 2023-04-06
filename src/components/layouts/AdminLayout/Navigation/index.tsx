import { Navbar, Center, Image, Stack, clsx } from "@mantine/core";
import { IconLogout, IconMenu2, IconX } from "@tabler/icons";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useMemo } from "react";
import NavigationLink from "./Link";
import { navLinks } from "./navLinks";

interface NavigationProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Navigation = ({ isOpen, setIsOpen }: NavigationProps) => {
    const { push } = useRouter();
    const links = useMemo(() => {
        return navLinks.map((item) => (
            <NavigationLink item={item} smallSize={!isOpen} />
        ));
    }, [isOpen]);

    return (
        <Navbar
            className="p-0"
            sx={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                transition: 'transform 0.3s ease',
            }}
            fixed
            position={{
                top: 0,
                left: 0,
                bottom: 0,
            }}
            style={{ overflowY: 'scroll', backgroundColor: "#39394B", transition: "width 0.25s" }}
            width={{ base: isOpen ? 218 : 80 }}
            hidden={true}
            p="md"
        >
            <div className={clsx("flex justify-between items-center mt-4", isOpen && "px-7", !isOpen && "flex-col-reverse gap-4")}>
                <div />

                <div className="flex items-center">
                    <Image
                        className={clsx(isOpen && "mr-2", !isOpen && "block")}
                        src="/images/trigan-symbol-white.svg"
                        alt="trigan logo"
                        width={32}
                    />
                    {isOpen && (
                        <h3 style={{ letterSpacing: "4px", fontSize: 14 }}>TRIGAN</h3>
                    )}
                </div>

                <span className="cursor-pointer">
                    <IconMenu2 color="#FFFFFF" onClick={() => setIsOpen((prev) => !prev)} />
                </span>
            </div>

            <Navbar.Section grow mt={50}>
                <Stack justify="center" spacing={0}>
                    {links}
                </Stack>
            </Navbar.Section>

            <Navbar.Section>
                <Stack justify="center" spacing={0}>
                    <NavigationLink
                        item={{ icon: IconLogout, url: "Logout" }}
                        onClick={() => {
                            localStorage.removeItem('access_token');
                            push('/admin/login');
                        }}
                    />
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
}

export default Navigation;
