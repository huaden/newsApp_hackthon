from flask import Blueprint, render_template, url_for, redirect, request, flash, abort, jsonify
#from dotenv import NEWS_API_KEY, NEWSDATA_API_KEY, GUARDIAN_API_KEY, NEWYORKTIMES_API_KEY
import requests



main = Blueprint('main', __name__)

@main.route('/')
@main.route('/index')
def index():
    return render_template('index.html')

@main.route('/api/news')
def get_news():

    NEWS_API_KEY = "8dd30d2b49b04f56956ac447dc30155b"

    #HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines"
    #GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?category=general&language=en&country=us"
    #BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?category=business&language=en&country=us"
    #SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?category=sports&language=en&country=us"
    #ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?category=entertainment&language=en&country=us"
    #TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?category=technology&language=en&country=us"
    SEARCH_NEWS = "https://newsapi.org/v2/top-headlines"

    #news_type = request.args.get('type')
    #query = request.args.get('query')
    news_type = "technology"
    query = "politics"

    """if news_type == 'general':
        url = GENERAL_NEWS
    elif news_type == 'business':
        url = BUSINESS_NEWS
    elif news_type == 'sports':
        url = SPORTS_NEWS
    elif news_type == 'entertainment':
        url = ENTERTAINMENT_NEWS
    elif news_type == 'technology':
        url = TECHNOLOGY_NEWS
    elif news_type == 'search':
        if not query:
            data =  jsonify({"error": "Query parameter is missing"}), 400
            return "hello world"
        url = f"{SEARCH_NEWS}?q={query}"""

    
    selected_categories = ["business"]#request.args.getlist('categories[]')

    params = {
        "pageSize": 10,
        "language": "en",
        "country": "us",
        "category":','.join(selected_categories),
        "apiKey": NEWS_API_KEY
    }

    url = SEARCH_NEWS + '?' + '&'.join([f'{key}={value}' for key, value in params.items()])
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch news data"}), 500

    return response


@main.route("/news_query")
def news_search():
    NEWS_API_KEY = "8dd30d2b49b04f56956ac447dc30155b"

    SEARCH_NEWS = "https://newsapi.org/v2/everything"

    query = "bitcoin" #request.args.get('query')

    if not query:
        data =  jsonify({"error": "Query parameter is missing"}), 400
        return "hello world"
    params = {
        "pageSize": 10,
        "language": "en",
        "q": query,
        "sortBy": "relevancy",
        "apiKey": NEWS_API_KEY
    }

    url = SEARCH_NEWS + '?' + '&'.join([f'{key}={value}' for key, value in params.items()])
    print(url)
    response = requests.get(url)

    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch news data"}), 500

    data = response.json()
    return data

    #business
    #entertainment
    #general
    #health
    #science
    #sports
    #technology

#data format that is returned
#"status": "ok",
#"totalResults": 36,
#-"articles": [
#-{
    #-"source": {
    #"id": "associated-press",
    #"name": "Associated Press"
    #},
    #"author": null,
    #"title": "Moscow concert hall attack: death toll rises to 133 - The Associated Press",
    #"description": "Russian President Vladimir Putin says authorities arrested four men suspected of carrying out the attack on a suburban Moscow concert hall that killed at least 133 people and believe they were fleeing to Ukraine. Putin said during an address to the nation Sat…",
    #"url": "https://apnews.com/article/russia-moscow-krasnogorsk-gunmen-concert-hall-fire-97e321c3c477ece36d4fb32f50fa0e8a",
    #"urlToImage": "https://dims.apnews.com/dims4/default/8cfc232/2147483647/strip/true/crop/2692x1514+6+0/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F0b%2F2c%2F3029a1078f122a69156ee387a8a6%2Fcb51d60b1ffa41cfbd773b5a4cd608fe",
    #"publishedAt": "2024-03-23T19:50:00Z",
    #"content": "MOSCOW (AP) The suburban Moscow concert hall where gunmen opened fire on concertgoers was a blackened, smoldering ruin Saturday as the death toll in the attack surpassed 130 and Russian authorities a… [+8623 chars]"
    #}, continues for next articles etc.