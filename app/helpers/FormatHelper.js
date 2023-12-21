const formatHelpers = {
    epochTimeToDatetime: async (value) => {
        const generate = new Date(value * 1000);

        const year = generate.getFullYear().toString();
        const month = (generate.getMonth() + 1).toString();
        const date = generate.getDate().toString();
        const time = generate.toLocaleTimeString();

        const result = year + "-" + month + "-" + date + " " + time;

        return result;
    },
};

module.exports = formatHelpers;
