import { createAsyncThunk } from "@reduxjs/toolkit";

let getAllTags = createAsyncThunk("tagsReducer/getAllTags", async (sort) => {
    let url = `https://api.stackexchange.com/2.2/tags?order=desc&sort=${sort}&site=stackoverflow`;
    return await fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                    `Sorry. We've got an error. Response status ${response.status}. It's a bad request`
                );
            }
            return response.json();
        })
        .then((data) => {
            return data.items.map((elem) => {
                return {
                    count: elem.count,
                    name: elem.name,
                };
            });
        });
});
export { getAllTags };
