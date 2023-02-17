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

    FIELDNAMES = [
        'isbn', 'pubtitle', 'pubshort', 'publisher', 'pubplace', 'pubdate'
    ]

    print(','.join(FIELDNAMES))

    for entry in doc.xpath("//source"):
        fieldvalues = []
        for fieldname in FIELDNAMES:
            fieldval = entry.xpath(fieldname)
            if fieldval:
                text = ''.join(fieldval[0].itertext()).replace('\n', ' ') # [0] !!!
                value = f'"{text}"'
            else:
                value = ''
            fieldvalues.append(value)
        print(','.join(fieldvalues))


if __name__ == '__main__':
    main()


# database
#  sourcelist ( source+ ) >
# 
# record
#  source ( (pubauthor_grp | pubeditor_grp), pubdate, pubtitle, volume?, pubshort?, staff?, publisher, pubplace, series?, (pp | size | isbn | issn)*, remark* ) >
# 
# fields -- minden lehet ures!
#  source/@id
#  source/@id2
#  source/@group
#  pubeditor_grp ( pubeditor+ ) ***LIST
#  pubeditor_grp/@type
#  pubauthor_grp ( pubauthor+ ) ***LIST
#  pubshort
#  isbn
#  remark
#  staff
#  pubtitle
#  volume
#  print
#  pp
#  size
#  issn
#  series
#  publisher
#  pubplace
#  pubdate

