 
'use server'
import { cookies } from 'next/headers'
export async function isAuthenticated() {
  // Get cookie
  const token = cookies().get('token')?.value
 
 if(token) {
     return true
    }
  else {
      return false
  }
}