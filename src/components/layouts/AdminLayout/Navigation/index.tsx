import { Navbar, Center, Image, Stack } from "@mantine/core";
import { IconLogout } from "@tabler/icons";
import { useRouter } from "next/router";
import { useMemo } from "react";
import NavigationLink from "./Link";
import { navLinks } from "./navLinks";

interface NavigationProps {
    isOpen: boolean;
}

const Navigation = ({ isOpen }: NavigationProps) => {
    const { push } = useRouter();
    const links = useMemo(() => {
        return navLinks.map((item) => (
            <NavigationLink item={item} />
        ));
    }, []);

    return (
        <Navbar
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
            style={{ overflowY: 'scroll' }}
            width={{ base: 218 }}
            hidden={!isOpen}
            p="md"
        >
            <Center sx={{ marginTop: '1rem' }}>
                <Image src="/images/trigan-symbol.svg" alt="trigan logo" width={40} />
            </Center>
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