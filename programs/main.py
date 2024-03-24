from flask import Blueprint, render_template, url_for, redirect, request, flash, abort, jsonify, session
#from dotenv import NEWS_API_KEY, NEWSDATA_API_KEY, GUARDIAN_API_KEY, NEWYORKTIMES_API_KEY
import requests
from bs4 import BeautifulSoup
from textblob import TextBlob
import yake
import random
import math

# global info
MAX_LENGTH = 100
TAKE_WORDS = 3
keywords = []
last_query = None 

def adjust_length(keywords):
    while len(keywords) > MAX_LENGTH:
        keywords.pop(0)

def select_word(keywords):
    # Assign weights according to a square root function
    weights = [math.sqrt(i) for i in range(1, len(keywords) + 1)]
    return random.choices(keywords, weights=weights, k=1)[0]

def extract_text(html_content):
    # Parse the HTML content
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Extract text from the parsed HTML, ignoring elements within angle brackets
    text = soup.get_text(separator='\n', strip=True)

    return text




def get_html_content(url):
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Return the HTML content
            return response.text
        else:
            print(f"Failed to retrieve HTML content from {url}. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"An error occurred while retrieving HTML content from {url}: {e}")
        return None
    
def split_text_by_lines(text):
    lines = text.split('\n')  # Split the text into lines
    chunks = []
    for line in lines:
        words = line.split()  # Split the line into words
        if len(words) >= 4:
            chunks.append(line + '\n')
    return ''.join(chunks)
main = Blueprint('main', __name__)


@main.route('/')
@main.route('/index')
def index():
    return render_template('index.html')

@main.route('/api/news')
def get_news():
    NEWS_API_KEY = "8dd30d2b49b04f56956ac447dc30155b"
    SEARCH_NEWS = "https://newsapi.org/v2/top-headlines"
    selected_categories = "business"#request.args.getlist('categories[]')
    params = {
        "pageSize": 10,
        "language": "en",
        "country": "us",
        "category": selected_categories,
        "apiKey": NEWS_API_KEY
    }
    url = SEARCH_NEWS + '?' + '&'.join([f'{key}={value}' for key, value in params.items()])
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch news data"}), 500
    data = response.json()
    articles = data.get("articles", [])
    for article in articles:
        html_content = get_html_content(article.get("url", ""))
        text_content = extract_text(html_content)
        text_content = split_text_by_lines(text_content)
        wiki = TextBlob(text_content)
        print(wiki.sentiment)
        print("\nTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTYTTTTTTTTTTTTTTTTTTTTTTTTTTT")
        print("\n")
    return data


@main.route("/news_query_good")
def news_search_good():
    global last_query
    global keywords
    # if good, then we will use yake to extract keywords
    kw_extractor = yake.KeywordExtractor()
    new_keywords = kw_extractor.extract_keywords(last_query)

    # take only the last TAKE_WORDS words
    new_keywords = new_keywords[-TAKE_WORDS:]
    new_keywords = [keyword[0] for keyword in new_keywords]
    keywords += new_keywords

    # adjust the length of the keywords
    adjust_length(keywords)

    # select a word from the keywords
    selected_word = select_word(keywords)
    print(keywords)
    print(selected_word)

    NEWS_API_KEY = "86592e745fc44d1588aadea623f8feab"

    SEARCH_NEWS = "https://newsapi.org/v2/everything"

    query = request.args.get(selected_word, selected_word)
    print(query)

    if not query:
        data =  jsonify({"error": "Query parameter is missing"}), 400
        return "hello world"

    # Reset page number to random number between 1 and 5
    page = random.randint(1, 5)

    params = {
        "pageSize": 1,
        "language": "en",
        "q": query,
        "sortBy": "relevancy",
        "page": page,
        "apiKey": NEWS_API_KEY
    }
    url = SEARCH_NEWS + '?' + '&'.join([f'{key}={value}' for key, value in params.items()])
    print(url)
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch news data"}), 500
    data = response.json()
    articles = data.get("articles", [])
    for article in articles:
        html_content = get_html_content(article.get("url", ""))
        text_content = extract_text(html_content)
        text_content = split_text_by_lines(text_content)
        last_query = text_content
        wiki = TextBlob(text_content)

        article["polarity"] = wiki.sentiment.polarity
        article["subjectivity"] = wiki.sentiment.subjectivity
        print(wiki.sentiment)
        print("\nTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTYTTTTTTTTTTTTTTTTTTTTTTTTTTT")
        print("\n")
    print(data)
    # Save the current page number to the session
    session['page'] = page + 1

    return data

@main.route("/news_query_bad")
def news_search_bad():
    global last_query

    NEWS_API_KEY = "86592e745fc44d1588aadea623f8feab"

    SEARCH_NEWS = "https://newsapi.org/v2/everything"

    query = request.args.get('query', 'bitcoin')
    print(query)

    if not query:
        data =  jsonify({"error": "Query parameter is missing"}), 400
        return "hello world"

    # Set page number to 1 if not in session
    page = session.get('page', 1)

    params = {
        "pageSize": 1,
        "language": "en",
        "q": query,
        "sortBy": "relevancy",
        "page": page,
        "apiKey": NEWS_API_KEY
    }
    url = SEARCH_NEWS + '?' + '&'.join([f'{key}={value}' for key, value in params.items()])
    print(url)
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch news data"}), 500
    data = response.json()
    articles = data.get("articles", [])
    for article in articles:
        html_content = get_html_content(article.get("url", ""))
        text_content = extract_text(html_content)
        text_content = split_text_by_lines(text_content)
        last_query = text_content
        wiki = TextBlob(text_content)

        article["polarity"] = wiki.sentiment.polarity
        article["subjectivity"] = wiki.sentiment.subjectivity
        print(wiki.sentiment)
        print("\n TT")
        print("\n")
    print(data)
    # Save the current page number to the session
    session['page'] = page + 1

    return data