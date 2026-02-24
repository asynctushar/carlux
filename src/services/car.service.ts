const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllCar = async () => {
    try {
        const res = await fetch(API_URL + "/products/category/vehicle", {
            method: "GET",
            cache: "force-cache",
            next: { revalidate: 60 * 60 },
        });

        const data = await res.json();

        if (!res.ok) {
            return {
                ok: false,
                error: {
                    message: data?.message || "Failed to fetch vehicles",
                    status: res.status,
                },
            };
        }

        return {
            ok: true,
            data: data.products ?? [],
        };
    } catch (err: any) {
        return {
            ok: false,
            error: {
                message: err.message || "Network error",
            },
        };
    }
};