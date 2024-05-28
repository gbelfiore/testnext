export async function GET(request: Request) {
    const headers = {'Cache-Control': 'no-store'}

    return new Response(JSON.stringify({"status": "ok"}), {status: 200, headers: headers})
}