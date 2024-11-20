'use client'
import { fetchData } from "@/lib/api";
const Settings = () => {

    // 模拟1s延迟
    fetchData();

    return (
        <div className="bg-orange-300 p-8 rounded-lg shadow-md w-1/4 text-center font-mono">
            <h2 className="text-2xl font-bold mb-6">
                设置页面
            </h2>
            <p className="text-2xl first-line:text-gray-600">
                /dashboard/settings/page.tsx
            </p>
        </div>
    )
}

export default Settings;