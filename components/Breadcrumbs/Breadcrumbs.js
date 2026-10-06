import Link from "next/link";
import { JsonLdScript, breadcrumbSchema } from "@/lib/seo";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs({ items }) {
  return (
    <nav className={styles.crumbs} aria-label="Breadcrumb">
      <JsonLdScript data={breadcrumbSchema(items)} />
      <ol className={styles.list}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className={styles.item}>
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
              {!last && <span className={styles.sep} aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
