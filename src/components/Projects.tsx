import { useState } from "react";
import { useGetProjects } from "../services/queries";
import { Projects } from "../types/projects";

type Props = {};

export default function Projects({}: Props) {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading } = useGetProjects(page);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  if (data) {
    return (
      <div>
        {data?.map((project: Projects) => {
          return (
            <div className="" key={project.id}>
              <h1>
                {project.id}. {project.name}
              </h1>
            </div>
          );
        })}
        <div className="flex gap-3 mt-5">
          <button
            className="bg-green-700 text-white px-2 py-1 rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <div className="bg-green-700 text-white px-2 py-1 rounded">
            {page}
          </div>
          <button
            className="bg-green-700 text-white px-2 py-1 rounded"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
