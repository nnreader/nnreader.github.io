export interface Novel {
  name: string; // 小说名称
  description?: string; // 小说描述
  sections: Array<{ title: string; content: string }>;
}

const isSessionLine = (line: string) => {
  return /^第[\s0-9一二三四五六七八九十百千万]+章/.test(line.trimStart());
};

export function transformText(text: string): Novel {
  const novel: Novel = {
    name: "小说名称",
    description: "小说描述",
    sections: [],
  };

  const lines = text.split("\n");

  while (lines.length) {
    const line = lines.shift() as string;

    if (isSessionLine(line)) {
      novel.sections.push({
        title: line.trim(),
        content: "",
      });
    } else {
      if (novel.sections.length === 0) {
        novel.description += line + "\n";
      } else {
        novel.sections[novel.sections.length - 1].content += line + "\n";
      }
    }
  }

  return novel;
}
