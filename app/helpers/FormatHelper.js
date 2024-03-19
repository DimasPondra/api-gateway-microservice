const formatHelpers = {
    epochTimeToDatetime: async (value) => {
        const generate = new Date(value * 1000);

        const year = generate.getFullYear().toString();
        let month = (generate.getMonth() + 1).toString();
        const date = generate.getDate().toString();
        const time = generate.toLocaleTimeString(undefined, { hour12: false });

        if (month !== "10" && month !== "11" && month !== "12") {
            month = "0" + month;
        }

        const result = year + "-" + month + "-" + date + " " + time;

        return result;
    },
};

module.exports = formatHelpers;
