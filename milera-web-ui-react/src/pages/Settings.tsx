import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    ArrowLeft,
    ChevronRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Trash2,
    User,
    UserX,
} from "lucide-react";
import { useState } from "react";

export default function Settings() {
    const [currentView, setCurrentView] = useState("main");
    const [userData, setUserData] = useState({
        username: "rahul_koju",
        email: "rahul.koju@example.com",
    });

    const [usernameInput, setUsernameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordForm, setPasswordForm] = useState({
        current: "",
        new: "",
        confirm: "",
        showPasswords: false,
    });
    const [loading, setLoading] = useState(false);

    const navigateTo = (
        view:
            | "main"
            | "username"
            | "email"
            | "password"
            | "deactivate"
            | "delete",
        data: { username?: string; email?: string } = {}
    ) => {
        setCurrentView(view);
        if (data.username) setUsernameInput(data.username);
        if (data.email) setEmailInput(data.email);
    };

    const handleSaveUsername = async () => {
        if (!usernameInput.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setUserData({ ...userData, username: usernameInput });
            setLoading(false);
            setCurrentView("main");
        }, 1000);
    };

    const handleSaveEmail = async () => {
        if (!emailInput.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setUserData({ ...userData, email: emailInput });
            setLoading(false);
            setCurrentView("main");
        }, 1000);
    };

    const handleSavePassword = async () => {
        if (
            !passwordForm.current ||
            !passwordForm.new ||
            passwordForm.new !== passwordForm.confirm
        )
            return;
        setLoading(true);
        setTimeout(() => {
            setPasswordForm({
                current: "",
                new: "",
                confirm: "",
                showPasswords: false,
            });
            setLoading(false);
            setCurrentView("main");
        }, 1000);
    };

    // Main Settings View
    const MainSettingsView = () => (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 px-4 py-3">
                <h1 className="text-xl font-bold">Settings</h1>
            </div>

            <div className="divide-y divide-gray-100">
                <div
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                        navigateTo("username", { username: userData.username })
                    }
                >
                    <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-600" />
                        <div>
                            <div className="font-medium">Username</div>
                            <div className="text-sm text-gray-500">
                                @{userData.username}
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                        navigateTo("email", { email: userData.email })
                    }
                >
                    <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-600" />
                        <div>
                            <div className="font-medium">Email</div>
                            <div className="text-sm text-gray-500">
                                {userData.email}
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigateTo("password")}
                >
                    <div className="flex items-center space-x-3">
                        <Lock className="h-5 w-5 text-gray-600" />
                        <div>
                            <div className="font-medium">
                                Change your password
                            </div>
                            <div className="text-sm text-gray-500">
                                Change your password at any time.
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigateTo("deactivate")}
                >
                    <div className="flex items-center space-x-3">
                        <UserX className="h-5 w-5 text-gray-600" />
                        <div>
                            <div className="font-medium">
                                Deactivate your account
                            </div>
                            <div className="text-sm text-gray-500">
                                Find out how you can deactivate your account.
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>

                <div
                    className="flex items-center justify-between px-4 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigateTo("delete")}
                >
                    <div className="flex items-center space-x-3">
                        <Trash2 className="h-5 w-5 text-red-500" />
                        <div>
                            <div className="font-medium text-red-600">
                                Delete your account
                            </div>
                            <div className="text-sm text-gray-500">
                                Permanently delete your account and all data.
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
            </div>
        </div>
    );

    // Username Edit View
    const UsernameView = () => (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 px-4 py-3 flex items-center">
                <button onClick={() => setCurrentView("main")} className="mr-4">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold">Username</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        className="w-full"
                    />
                </div>

                <div>
                    <h3 className="font-medium mb-2">Suggestions</h3>
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => setUsernameInput("koju_rahul")}
                    >
                        koju_rahul
                    </button>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <Button
                    onClick={handleSaveUsername}
                    disabled={loading || !usernameInput.trim()}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );

    // Email Edit View
    const EmailView = () => (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 px-4 py-3 flex items-center">
                <button onClick={() => setCurrentView("main")} className="mr-4">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold">Email</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full"
                    />
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <Button
                    onClick={handleSaveEmail}
                    disabled={loading || !emailInput.trim()}
                    className="w-full bg-blue-500 hover:bg-blue-600"
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );

    // Password Change View
    const PasswordView = () => (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 px-4 py-3 flex items-center">
                <button onClick={() => setCurrentView("main")} className="mr-4">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold">Change password</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current password</Label>
                    <div className="relative">
                        <Input
                            id="current-password"
                            type={
                                passwordForm.showPasswords ? "text" : "password"
                            }
                            value={passwordForm.current}
                            onChange={(e) =>
                                setPasswordForm({
                                    ...passwordForm,
                                    current: e.target.value,
                                })
                            }
                            className="w-full pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() =>
                                setPasswordForm({
                                    ...passwordForm,
                                    showPasswords: !passwordForm.showPasswords,
                                })
                            }
                        >
                            {passwordForm.showPasswords ? (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                                <Eye className="h-4 w-4 text-gray-400" />
                            )}
                        </button>
                    </div>
                    <button className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                    </button>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="new-password">New password</Label>
                    <Input
                        id="new-password"
                        type={passwordForm.showPasswords ? "text" : "password"}
                        value={passwordForm.new}
                        onChange={(e) =>
                            setPasswordForm({
                                ...passwordForm,
                                new: e.target.value,
                            })
                        }
                        className="w-full"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm password</Label>
                    <Input
                        id="confirm-password"
                        type={passwordForm.showPasswords ? "text" : "password"}
                        value={passwordForm.confirm}
                        onChange={(e) =>
                            setPasswordForm({
                                ...passwordForm,
                                confirm: e.target.value,
                            })
                        }
                        className="w-full"
                    />
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <Button
                    onClick={handleSavePassword}
                    disabled={
                        loading ||
                        !passwordForm.current ||
                        !passwordForm.new ||
                        passwordForm.new !== passwordForm.confirm
                    }
                    className="w-full bg-blue-500 hover:bg-blue-600"
                >
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>
        </div>
    );

    // Deactivate Account View
    const DeactivateView = () => (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 px-4 py-3 flex items-center">
                <button onClick={() => setCurrentView("main")} className="mr-4">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold">Deactivate account</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">
                        This will deactivate your account
                    </h2>
                    <div className="space-y-3 text-sm text-gray-600">
                        <p>
                            You're about to start the process of deactivating
                            your account. Your display name, @username, and
                            public profile will no longer be viewable.
                        </p>
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-900">
                                What else you should know
                            </h3>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>
                                    You can restore your account if it was
                                    accidentally or wrongfully deactivated for
                                    up to 30 days after deactivation.
                                </li>
                                <li>
                                    Some account information may still be
                                    available in search engines, such as Google
                                    or Bing.
                                </li>
                                <li>
                                    If you just want to change your @username,
                                    you don't need to deactivate your account —
                                    edit it in your settings.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <Button
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() =>
                        alert("Account deactivation process would start here")
                    }
                >
                    Deactivate
                </Button>
            </div>
        </div>
    );

    // Delete Account View
    const DeleteView = () => (
        <div className="min-h-screen bg-white">
            <div className="border-b border-gray-200 px-4 py-3 flex items-center">
                <button onClick={() => setCurrentView("main")} className="mr-4">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-xl font-bold">Delete account</h1>
            </div>

            <div className="p-4 space-y-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-red-600">
                        This will delete your account
                    </h2>
                    <div className="space-y-3 text-sm text-gray-600">
                        <p className="text-red-600 font-medium">
                            This action cannot be undone. This will permanently
                            delete your account and remove all of your data from
                            our servers.
                        </p>
                        <div className="space-y-2">
                            <h3 className="font-medium text-gray-900">
                                What will be deleted:
                            </h3>
                            <ul className="space-y-1 list-disc list-inside">
                                <li>Your profile and account settings</li>
                                <li>All of your posts and media</li>
                                <li>Your followers and following lists</li>
                                <li>All messages and conversations</li>
                                <li>All associated data and analytics</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="delete-confirmation">
                        Type "DELETE" to confirm
                    </Label>
                    <Input
                        id="delete-confirmation"
                        placeholder="Type DELETE to confirm"
                        className="w-full"
                    />
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                <Button
                    variant="destructive"
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() =>
                        alert("Account deletion process would start here")
                    }
                >
                    Delete Account Permanently
                </Button>
            </div>
        </div>
    );

    // Render current view
    const renderView = () => {
        switch (currentView) {
            case "username":
                return <UsernameView />;
            case "email":
                return <EmailView />;
            case "password":
                return <PasswordView />;
            case "deactivate":
                return <DeactivateView />;
            case "delete":
                return <DeleteView />;
            default:
                return <MainSettingsView />;
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            {renderView()}
        </div>
    );
}
