#!/usr/local/bin/python

import sys, re, json
import bibtexparser

# venues = { 'ICRA': 'May', 
#            'IROS': 'October', 
#            'RSS': 'July', 
#            'SAB': 'July', 
#            'DARS': 'June',
#            'ALife': 'September', 
#            'CRV': 'June' 
# }

venues = { 'ICRA': 'May', 
           'IROS': 'October', 
           'RSS': 'July', 
           'SAB': 'July', 
           'DARS': 'June',
           'ALife': 'September', 
           'CRV': 'June' ,
           'ICAR': 'July',
           'MSc': 'August', 
           'PhD': 'August',
           'MVA': 'August',
           'TRo' : 'January',
           'HRI' :  'March',
           'JMVA' : 'January',
           'Swarm' : 'January',
           'Report' : 'January',
           'IJCAI' : 'August',
           'Agents' : 'July',
           'AAMAS' : 'July',
           'SIRS' : 'July',
           'Auro' : 'January',
           'ECAL' : 'July'
}

papers = {}

def getkeys( filename ):

    with open( filename ) as bibtex_file:
        bibtex_str = bibtex_file.read()

        bib_database = bibtexparser.loads(bibtex_str)

        # print bib_database.entries

        
        for entry in bib_database.entries:

            tag = 'ID'

            if tag in entry:
                # print entry
                book = entry[ tag ]

                found = False
                for venue, month in venues.iteritems():                    
                    if (':'+venue.lower()) in book:
                        found = True
                        author = entry[ 'author' ]
                        
                        try:
                            end = author.find ( ' and' );

                            if end == -1:
                                firstauthor = author
                            else:
                                firstauthor = author[ :end ]                        
                                                            
                                

                            # find the last instance of a space in the name
                            firstauthor = firstauthor[ firstauthor.rfind( ' ' )+1: ]

                        except AttributeError:
                            # AAA, ZZZ not found in the original string
                            #found = '' # apply your error handling
                            print 'no and', author

                        year = entry[ 'year']

                        if 'month' in entry:
                            month =  entry[ 'month' ]
                            # print "found month", month, 'in',  book

                        startdate = '1-' + month + '-' + year
                        enddate = '4-' + month + '-' + year
                                                
                        if venue not in papers:
                            papers[ venue ]  = []

                        papers[ venue ].append( [ firstauthor, startdate, enddate ] )

                if not found:
                    sys.stderr.write( 'UNUSED: ' + book + '\n' )

        print json.dumps( papers, indent=2, separators=(',', ': '))

        sys.stdout.flush()

if __name__ == "__main__":
    
    # first argument is the command/action - selects a function from the table.
    if  len( sys.argv ) == 2:

        getkeys( sys.argv[1] )

    else:
        print "specify an entry type. File contains:"
        print 'TODO'

exit(1)
        
