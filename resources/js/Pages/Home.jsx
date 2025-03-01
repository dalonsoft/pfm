export default function Home({ message }) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-blue-600">{message}</h1>
        </div>
    );
}
