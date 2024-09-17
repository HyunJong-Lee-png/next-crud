'use client'
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Options() {
  const { id } = useParams();
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (data) {
      router.push('/');
      router.refresh();
    }
  }

  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id &&
        <>
          <li><Link href={`/update/${id}`}>Update</Link></li>
          <li><input type="button" value={'delete'} onClick={handleDelete} /></li>
        </>}
    </ul>
  );
}