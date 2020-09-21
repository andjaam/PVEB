import io

def to_json(target, final):
    with open(target, "r", encoding="utf-8") as f:
        text = "["

        for line in f:
            pom = "{"
            pom += f'''
            "word": "{line.strip()}",
            "chosen": 0,
            "given": 0,
            "hit": 0        
            '''
            pom += "},\n"
            text+=pom

        text = text[:-2]
        text += '\n'
        text += "]"
        with open(final, "w", encoding="utf-8") as r: 
            r.write(text)
        r.close()
    f.close()

to_json('words.txt', 'database.json')
to_json('reci.txt', 'database_srb.json')
