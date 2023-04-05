import { useRouter } from "next/router"
import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";
import { useMemo } from "react";
import {NavLinkItem} from "./navLinks";
import { IconCaretDown, IconCaretUp } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  navigationLink: {
    color: "#61616F",
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 30px",
    backgroundImage: "linear-gradient(to left, #61616F 50%, transparent 50%) !important",
    backgroundSize: "200% 100% !important",
    transition: "background-position 0.25s !important",

    '&.small': {
      display: "flex",
      justifyContent: "center",
      paddingLeft: 0,
      paddingRight: 0,
    },

    '&:hover': {
      backgroundPosition: "-100% 0 !important",
      color: "#39394B",
    },
  },

  active: {
    backgroundColor: "#61616F !important",
    color: "#39394B",
  },
}))

export interface NavigationLinkProps {
  item: NavLinkItem,
  smallSize?: boolean,
  onClick?: () => void,
}

const NavigationLink = ({
  item: {icon: Icon, url, label, links},
  smallSize = false,
  onClick,
}: NavigationLinkProps) => {
  const {classes, cx} = useStyles();
  const {pathname, push} = useRouter()
  const isActive = useMemo(() => {
    const page = pathname.replace('/admin/', '');
    if (!links) {
      return page === url;
    }
    return links
      .map(({ url }) => url)
      .concat(url)
      .includes(page);
  }, [url, links, pathname]);

  const submenuToggle = useMemo(() => {
    if (!links) {
      return null;
    }
    const props = {
      width: 16,
      height: 16,
    };
    if (isActive) {
      return <IconCaretDown {...props} />;
    } else {
      return <IconCaretUp {...props} />;
    }
  }, [links, isActive]);

  return (
    <>
      <UnstyledButton
        className={cx(classes.navigationLink, smallSize && "small", {
          [classes.active]:
            isActive,
        })}
        onClick={() => {
          push(`/admin/${url}`);
          onClick?.();
        }}
      >
        <div className="flex">
          <Icon className={cx(!smallSize && "mr-4")} stroke={1.5} />

          {!smallSize && label}
        </div>

        {!smallSize && submenuToggle}
      </UnstyledButton>

      {isActive && links?.map(({ url, label, icon: Icon }, index) => (
        <UnstyledButton
          key={`${url}-${index}`}
          className="flex"
          onClick={() => {
            push(`/admin/${url}`);
          }}
          // className={cx(classes.link, {
          //   [classes.active]: item.label === active,
          // })}
        >
          <Icon stroke={0.5} />

          {!smallSize && label}
        </UnstyledButton>
      ))}
    </>
  );
}

export default NavigationLink;
