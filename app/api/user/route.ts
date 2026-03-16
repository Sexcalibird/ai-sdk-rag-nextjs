import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    const session = await getServerSession(authOptions);
    // console.log(session?.user?.token)
    try {
        const response = await fetch(`https://app.capnuochaiphong.com.vn/MoiNoi/api/sdt/${session.user.account.taikhoan}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.user?.token}`
            },
        });
        const res = await response.json();
        return Response.json({
            ...res,
            data: res.data.find(i => i.ms_mnoi == session.user.account.taikhoan)
        });
    } catch (error) {
        console.log(error)
    }
}