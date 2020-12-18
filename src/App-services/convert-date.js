let convertDate = (value) => {
    let date = new Date(value * 1000);
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let day = date.getDay() < 10 ? `0${date.getDay()}` : `${date.getDay()}`;
    let hours =
        date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    let minutes =
        date.getMinutes() < 10
            ? `0${date.getMinutes()}`
            : `${date.getMinutes()}`;
    return `${hours}:${minutes} ${day} ${
        months[date.getMonth()]
    } ${date.getFullYear()}`;
};
export default convertDate;
