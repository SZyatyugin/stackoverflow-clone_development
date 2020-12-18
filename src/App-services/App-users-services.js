import { createAsyncThunk } from "@reduxjs/toolkit";
const getAllUsers = createAsyncThunk(
    "usersReducer/getAllUsers",
    async (data) => {
        let [order, activeFilter] = data;
        let url = `https://api.stackexchange.com/2.2/users?order=${order}&sort=${activeFilter}&site=stackoverflow&filter=!9_bDDp)d5`;
        return await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Sorry. We've got an error. Response status ${response.status}. It's a bad request`
                    );
                }
                return response.json();
            })
            .then((result) => {
                return result.items.map((elem) => {
                    return usersTemplate(elem);
                });
            });
    }
);

let usersTemplate = (data) => {
    return {
        location: data.location,
        account_id: data.account_id,
        user_id: data.user_id,
        reputation: data.reputation,
        repuation_change_week: data.repuation_change_week,
        profile_image: data.profile_image,
        display_name: data.display_name,
        about_me: data.about_me,
    };
};
export { getAllUsers };
