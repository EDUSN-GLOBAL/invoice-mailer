import generalApi from "#/store/query/generalApi";

const mailApi=generalApi.injectEndpoints({
    endpoints: (build) => ({
        getMail: build.query({
            query: ({size,page}) => ({
                url: "/staff/mails",
                params: {
                    size,
                    page
                }
            }
            )
        }),
    }),
})
export const { useGetMailQuery } = mailApi
export default mailApi
