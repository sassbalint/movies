"""
Convert dict-biblio to csv.
"""


import lxml.etree as ET


FILENAME = 'dictionaries_biblio.xml'


def xprint(element):
    """Pretty-print an XML element."""
    print(ET.tostring(element, pretty_print=True, encoding='utf8').decode())


def main():
    """Main."""
    parser = ET.XMLParser(remove_blank_text=True)
    doc = ET.parse(FILENAME, parser)

    ATTR, ELEM, LIST = 0, 1, 2

    FIELDNAMES = [
        'id', 'id2', 'group',
        'pubauthor',
        'pubeditor', 'pubeditor_type',
        'pubdate', 'pubtitle', 'volume', 'pubshort', 'staff',
        'publisher', 'pubplace', 'series', 'pp', 'size',
        'isbn', 'issn', 'remark'
    ]

    # xpath can be different from field name
    XPATHS = [
        '@id', '@id2', '@group',
        'pubauthor_grp/pubauthor',
        'pubeditor_grp/pubeditor', 'pubeditor_grp/@type'
    ] + FIELDNAMES[6:]

    TYPES = [
        ATTR, ATTR, ATTR,
        LIST,
        LIST, ATTR,
        ELEM, ELEM, ELEM, ELEM, ELEM,
        ELEM, ELEM, ELEM, ELEM, ELEM,
        ELEM, ELEM, ELEM
    ]

    print(','.join(FIELDNAMES))

    for entry in doc.xpath("//source"):
        row = []
        for xpath, typ in zip(XPATHS, TYPES):
            fieldvalue = entry.xpath(xpath)
            if fieldvalue:
                if typ == ATTR:
                    text = fieldvalue[0]
                # ok for ELEM too as it is a 1-element LIST always
                elif typ in [ELEM, LIST]:
                    text = ' & '.join(
                        '/'.join(val.itertext()).replace('\n', ' ')
                        for val in fieldvalue)
                # '/' if for handling <print> -- could be better XXX
                else:
                    exit(f'!!! Unknown type: {typ}')
                value = f'"{text}"'
            else:
                value = '–'
            row.append(value)
        print(','.join(row))


if __name__ == '__main__':
    main()

