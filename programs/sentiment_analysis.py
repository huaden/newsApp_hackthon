from textblob import TextBlob

wiki = TextBlob("Hayden is a bad man!")
print(wiki.sentiment)