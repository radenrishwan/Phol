"use client";

export const getCookie = (name: string): string | undefined => {
    const cookie = document.cookie
        .split(";")
        .find((c) => c.trim().startsWith(name + "="))
        ?.split("=")[1];

    return cookie;
};
