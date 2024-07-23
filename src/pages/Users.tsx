import { axiosRequest } from "@/util/axiosInstance";
import axios, { CancelTokenSource } from "axios";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export type UserType = {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type UseLoaderDataType = {
  users: UserType[];
};

const Users: React.FC = () => {
  const { users } = useLoaderData() as UseLoaderDataType;
  return (
    <div className="bg-background min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Users</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user: UserType) => (
          <Link
            to={`/users/${user.id}`}
            className=" transition-colors duration-300"
          >
            <div
              key={user.id}
              className="bg-background rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-accent"
            >
              <div className="bg-foreground p-4">
                <h2 className="text-xl font-semibold text-background">
                  {user.name}
                </h2>
              </div>
              <div className="p-4 space-y-2 bg-accent">
                <div className="text-navy-600">
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div className="text-navy-600">
                  <span className="font-medium">Address:</span>{" "}
                  {user.address.street}
                </div>
                <div className="text-navy-600">
                  <span className="font-medium">Phone:</span> {user.phone}
                </div>
                <div className="text-navy-600">
                  <span className="font-medium">Website:</span> {user.website}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const loader = async () => {
  const config = { method: "GET" };
  const cancelTokens: CancelTokenSource[] = [];

  try {
    const userResult = await axiosRequest({
      endPoint: "/users",
      config,
    });
    if (userResult?.cancelToken) cancelTokens.push(userResult.cancelToken);
    const userData: UserType = userResult?.data;

    return { users: userData };
  } catch (e) {
    if (axios.isCancel(e)) {
      console.log("Request canceled", e.message);
      return null;
    }
    throw e;
  } finally {
    // 모든 요청 취소 (이미 완료된 요청에는 영향 없음)
    cancelTokens.forEach((cancelToken) => {
      cancelToken.cancel("Request canceled by cleanup");
    });
  }
};

const UsersRoute = {
  element: <Users />,
  loader,
};

export default UsersRoute;
