# nodeio
To launch the server with forever go to the project directory and type this cmd:
forever start bin/www &

#
how to delete all search results from elastic search:
curl -XDELETE 'http://104.154.66.240:9200/twitter/crawlers'
curl -XDELETE 'http://104.154.66.240:9200/twitter/posts'
