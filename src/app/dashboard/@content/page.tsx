"use client";

import React from "react";
import { DynamicBreadcrumb } from "../_components/bread-crumb";
import { ChevronsDown, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useInfiniteDiplomas from "./_hooks/use-infinite-query";
import InfiniteScroll from "react-infinite-scroll-component";
export default function DiplomsPage() {
  const { data, fetchNextPage, hasNextPage ,isLoading} = useInfiniteDiplomas();

  const diplomas = data?.pages.flatMap((page) => page.subjects) || [];

  return (
 <div className="bg-white pt-0">
      <div className="p-4">
        <DynamicBreadcrumb />
      </div>

      <div className="p-6 bg-gray-100">
        <div className="flex bg-blue-600 p-4 gap-4 text-white">
          <GraduationCap size={45} />
          <h1 className="text-3xl font-semibold">Diplomas</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl font-semibold text-blue-600 animate-pulse">
              Loading diplomas...
            </p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={diplomas.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={
              <div className="text-center flex flex-col items-center">
                <p>Scroll to view more</p>
                <ChevronsDown />
              </div>
            }
            endMessage={
              diplomas.length > 0 && (
                <p className="text-gray-500 text-center mt-4">
                  No more diplomas
                </p>
              )
            }
          >
            <div className="flex flex-wrap items-center">
              {diplomas.map((d) => (
                <div
                  key={d._id}
                  className="lg:w-1/3 sm:w-full md:w-1/2 p-2 relative"
                >
                  <Link href={"/dashboard/exams"}>
                    <Image
                      src={d.icon}
                      alt={d.name || ""}
                      width={336}
                      height={448}
                      className="w-full"
                    />
                    <div className="bg-blue-600/50 absolute bottom-10 inset-x-0 ml-4 mr-4">
                      <h3 className="text-white pt-5 pb-5 pl-4 w-full font-semibold text-xl">
                        {d.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}