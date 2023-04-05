import { useRouter } from "next/router"
import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";
import { useMemo } from "react";
import {NavLinkItem} from "./navLinks";
import { IconCaretDown, IconCaretUp } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  main: {
    display: "flex",
    // backgroundColor: "#222131",
    minHeight: "100vh",
  },
  link: {
    // width: 50,
    // height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
    position: 'relative',
  },
  navbar: {
    width: "0px",
    transition: "width 0.3 ease"
  },
  navbarOpen: {
    width: "218px",
  },
  slideLeft: {
    transform: 'translateX(-80px)',
    transition: 'transform 0.3s ease',
  },
  slideRight: {
    transform: 'translateX(calc(100vw - 80px))',
    transition: 'transform 0.3s ease',
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  dropdown: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}))

export interface NavigationLinkProps {
  item: NavLinkItem,
  onClick?: () => void,
}

const NavigationLink = ({
  item: {icon: Icon, url, label, links},
  onClick,
}: NavigationLinkProps) => {
  const {classes, cx} = useStyles();
  const {pathname, push} = useRouter()
  const isActive = useMemo(() => {
    if (!links) {
      return false;
    }
    return links
      .map(({ url }) => url)
      .concat(url)
      .includes(pathname.replace('/admin/', ''));
  }, [links, pathname]);

  const submenuToggle = useMemo(() => {
    if (!links) {
      return null;
    }
    const props = {
      width: 16,
      height: 16,
      // className: classes.dropdown,
    };
    if (isActive) {
      return <IconCaretDown {...props} />;
    } else {
      return <IconCaretUp {...props} />;
    }
  }, [links, isActive]);

  return (
    <>
      <Tooltip label={label} position="right" transitionDuration={0}>
        <UnstyledButton
          className={cx("flex justify-between", classes.link, {
            [classes.active]:
              isActive,
          })}
          onClick={() => {
            push(`/admin/${url}`);
            onClick?.();
          }}
        >
          <div className="flex">
            <Icon className="mr-4" stroke={1.5} />

            {label}
          </div>

          {submenuToggle}
        </UnstyledButton>
      </Tooltip>

      {isActive && links?.map(({ url, label, icon: Icon }, index) => (
        <Tooltip
          label={url}
          position="right"
          transitionDuration={1}
          key={`${url}-${index}`}
        >
          <UnstyledButton
            className="flex"
            onClick={() => {
              push(`/admin/${url}`);
            }}
            // className={cx(classes.link, {
            //   [classes.active]: item.label === active,
            // })}
          >
            <Icon stroke={0.5} />

            {label}
          </UnstyledButton>
        </Tooltip>
      ))}
    </>
  );
}

export default NavigationLink;