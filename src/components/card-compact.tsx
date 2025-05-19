import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import React from "react";

type CardCompactProps = {
  className?: string;
  description: string;
  title: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
}


const CardCompact = ({
  className,
  description,
  title,
  content,
  footer
}: CardCompactProps) => {
  return (
    <Card className={`w-full max-w-[420px] self-center ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
      {footer && <div className="p-4">{footer}</div>}
    </Card>
  )
};

export { CardCompact }