'use client'

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Update({ params: { id } }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:8888/topics/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setBody(data.body);
    })();
  }, []);

  return (
    <form onSubmit={async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`, {
        method: "PATCH",
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
        <input type="text" name="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </p>
      <p>
        <textarea name="body" placeholder="body" value={body} onChange={(e) => setBody(e.target.value)} />
      </p>
      <p>
        <input type="submit" value='update' />
      </p>
    </form>
  );
}