'use client'

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function Create() {
  const router = useRouter();
  return (
    <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const title = (form.elements.namedItem('title') as HTMLInputElement).value;
      const body = (form.elements.namedItem('body') as HTMLInputElement).value;

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body
        })
      });
      const data = await res.json();
      if (data) {
        router.push(`/read/${data.id}`);
        router.refresh();
      }
    }}>
      <p>
        <input type="text" name="title" placeholder="title" />
      </p>
      <p>
        <textarea name="body" placeholder="body" />
      </p>
      <p>
        <input type="submit" value='create' />
      </p>
    </form>
  );
}