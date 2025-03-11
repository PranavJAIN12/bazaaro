import React from "react";
import { auth } from "@/auth";
import { Shield, Mail, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import AddressForm from "@/components/AddressForm";
import { dbConnect } from "@/lib/Mongodb";
import UserModel from "@/models/user";

const ProfilePage = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <p className="text-center text-red-500">Not authenticated</p>;
  }

  await dbConnect();
  const user = await UserModel.findOne({ user_id: session.user.id });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              className="rounded-full w-full h-full object-cover border-4 border-gray-200"
              height={100}
              width={100}
            />
          ) : (
            <div className="rounded-full w-full h-full bg-gray-200 flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{user?.name || "User"}</h1>
        <p className="text-gray-500">{user?.role || "User"}</p>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm">{user?.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                <dd className="mt-1 text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              {user?.address || <AddressForm/>}
            </p>
          </CardContent>
        </Card>

        {/* <AddressForm /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
