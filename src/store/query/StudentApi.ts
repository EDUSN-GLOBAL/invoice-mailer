import { FileFromInstallment } from "#/app/installments/[name]/[installment_id]/_component/installmentFiles";
import { Installment } from "#/app/installments/[name]/_component/SingleStudentFile";
import generalApi from "./generalApi";

const studentApi = generalApi.injectEndpoints({

    endpoints: (builder) => ({
      addStudent: builder.mutation({
          query: (data) => ({
              url: '/staff/students/add',
              method: 'POST',
              body: data
          }),
          invalidatesTags: ['student']
      }),
        getAllStudents: builder.query({
            query: ({page,query}) => ({
                url: `/staff/students?page=${page}&query=${query}`,
                method: 'GET',



            }),
            providesTags: ['student']
        }),
        updateStudent: builder.mutation({
            query: ({data,id}) => ({
                url: `/staff/students/update?id=${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['student']
        }),
        getAllInstallmentsByStudentId: builder.query<Installment[], any>({

            query: ({id}) => ({
                url: `staff/installments/${id}`
                , method: 'GET'

            })
            ,providesTags: (result, error, arg) =>  result
          ? [...result.map(({ id }) => ({ type: 'installment' as const, id })), 'installment']
          : ['installment'],
        }),
        addInstallmentByStudentId: builder.mutation<any, any>({
            query: ({ id }) => {
                return {
                    url: `staff/installments/add?id=${id}`,
                    method: 'POST',


                }

            },
            invalidatesTags:['installment']
        }),
        addFileToInstallment: builder.mutation<any, AddFile>({
            query: ({form,id}) => {
                return {
                    url: `staff/installments/${id}/add`,
                    method: 'POST',
                    body: form,



                }
            }
            ,invalidatesTags:(result, error, arg) =>  result ? [{ type: 'files' as const, id: arg.id }, 'files'] : ['files'],
        })
        ,   getAllFilesFromInstallment: builder.query<FileFromInstallment[], any>({
            query: ({id}) => ({
                url: `staff/installments/${id}/files`
                , method: 'GET'

            })
            ,providesTags: (result, error, arg) =>  result
          ? [...result.map(({ id }) => ({ type: 'files' as const, id })), 'files']
          : ['files'],
        }),
        sendEmail: builder.mutation<FormData, AddFile>({
            query: ({form, id}) => ({
                url: `/staff/sendEmail/${id}`,
                method: 'POST',
                body: form
            }),
        })
    }),




 })
export default studentApi;
export const {useGetAllFilesFromInstallmentQuery, useAddStudentMutation,useAddFileToInstallmentMutation, useGetAllStudentsQuery, useUpdateStudentMutation,useGetAllInstallmentsByStudentIdQuery,useAddInstallmentByStudentIdMutation,useSendEmailMutation } = studentApi

type AddFile={
    form: FormData
    id: number
}
