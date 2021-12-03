import { PER_PAGE } from "config";
import React from "react";
import Link from "next/link";

function Pagination({ total, page }) {
  const totalPages = Math.ceil(total / PER_PAGE);
  return (
    <>
      {page > 1 && (
        <Link href={`/events?page=${+page - 1}`}>
          <a href="#" className="btn btn-secondary">
            {"<< "}Prev
          </a>
        </Link>
      )}
      {page < totalPages && (
        <Link href={`/events?page=${+page + 1}`}>
          <a href="#" className="btn btn-secondary">
            Next {" >>"}
          </a>
        </Link>
      )}
    </>
  );
}

export default Pagination;
