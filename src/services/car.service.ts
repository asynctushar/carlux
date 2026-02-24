export const getAllCar = async () => {
    try {
        const res = await fetch("https://dummyjson.com/products/category/vehicle", {
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

        console.log(data)

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