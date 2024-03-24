# https://textblob.readthedocs.io/en/dev/install.html -- link for installation

from textblob import TextBlob

wiki = TextBlob("Hayden is a bad man!")
print(wiki.sentiment)