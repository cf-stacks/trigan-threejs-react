import React, { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import { Button, createStyles, Input } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons';


const useStyles = createStyles(() => ({
    topSection: {
        display: 'flex',
        alignItems: 'center',
        '@media only screen and (max-width: 850px)': {
            flexDirection: 'column',
        },
    },
    searchContainer: {
        marginRight: "1.5rem",
        position: "relative",
        display: 'flex',
        width: '341px',
        '@media only screen and (max-width: 850px)': {
            width: '300px',
        },

        input: {
            backgroundColor: "#39394B",
            color: "white",
            borderRadius: "10px",
            padding: "12px 20px",
            paddingRight: "62px",
            width: "100%",
            height: "42px",
        },

        button: {
            borderRadius: "10px",
            position: "absolute",
            right: "0",
            color: "white",
            height: "42px",
            width: "42px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }
    },

    addButton: {
        backgroundColor: "#A855F7 !important",
        fontSize: "14px",
        borderRadius: "10px",
        padding: "12px 20px",
    },
}));

interface TableHeaderProps {
    search: {
        value: string;
        onChange: ChangeEventHandler<HTMLInputElement>;
        handleSubmit: FormEventHandler<HTMLFormElement>;
        placeholder?: string;
    };
    create: {
        onClick: MouseEventHandler<HTMLButtonElement>;
        text: string | JSX.Element
    }
}

const TabHeaderAction: React.FC<TableHeaderProps> = (props) => {
    const { search, create } = props;
    const { classes } = useStyles();

    return (
        <section className={classes.topSection}>
            <form className={classes.searchContainer} onSubmit={search.handleSubmit}>
                <Input
                    sx={{ width: '100%' }}
                    placeholder={search.placeholder ?? "Search by title"}
                    value={search.value}
                    onChange={search.onChange}
                />
                <button type="submit">
                    <IconSearch />
                </button>
            </form>

            <Button
                className={classes.addButton}
                variant="filled"
                onClick={create.onClick}
                leftIcon={<IconPlus />}
            >
                {create.text}
            </Button>
        </section>
    )
}

export default TabHeaderAction