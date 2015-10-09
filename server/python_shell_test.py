import sys, json
from elasticsearch import Elasticsearch
es = Elasticsearch(host= '104.154.66.240',port=9200)
# # simple JSON echo script

# text=""

# for line in sys.stdin:
#   text=text+line
# #print text,"first"
# if str(text)=='hello':
# 	print "yesss"
# #print "message sent from python"







import re
import math
#get words of sentence
def getwords(doc):
	splitter=re.compile('\\W*')
	# Split the words by non-alpha characters
	words=[s.lower( ) for s in splitter.split(doc)
	if len(s)>2 and len(s)<20]
	# Return the unique set of words only
	return dict([(w,1) for w in words])

#features is one word like "quick"
#category is a classification like "good" "bad" 


class classifier:
	def __init__(self,getfeatures=getwords,filename=None):
		#in first get values of fc and cc from ElasticSearch

		training_stats =es.search(index="twitter",doc_type="training_stats", body={"query": {"match_all": {}}})
		#training_stats =es.delete(index="twitter",doc_type="training_stats", id="AUvEw6l--WcpkF1rYNLk")
		#print "#############",training_stats["hits"]["hits"][0]["_source"]["fc"],"#############"
		#training_stats["hits"]["hits"][0]["_source"]["fc"]
		# Counts of feature/category combinations
		
		if ( len(training_stats["hits"]["hits"])==0):
			self.fc={}
			self.cc={}
		else:
			self.fc=training_stats["hits"]["hits"][0]["_source"]["fc"]
			# Counts of documents in each category
			self.cc=training_stats["hits"]["hits"][0]["_source"]["cc"]
		#print getfeatures,"gfffffffffff"
		self.getfeatures=getfeatures



	# Increase the count of a feature in category pair
	#("the", good) ==> 'the': {'good':1}
	def incf(self,f,cat):
		self.fc.setdefault(f,{})
		self.fc[f].setdefault(cat,0)
		self.fc[f][cat]+=1
		
	# Increase the count of a category
	def incc(self,cat):
		self.cc.setdefault(cat,0)
		self.cc[cat]+=1
	# The number of times a feature has appeared in a category exp ('the': 'good')
	def fcount(self,f,cat):
		#print f, cat, "fcount",self.fc
		if f in self.fc and cat in self.fc[f]:
			return float(self.fc[f][cat])
		return 0.0
	# The number of items in a category
	def catcount(self,cat):
		if cat in self.cc:
			return float(self.cc[cat])
		return 0
	# The total number of items
	def totalcount(self):
		return sum(self.cc.values( ))
	# The list of all categories
	def categories(self):
		return self.cc.keys()

	def train(self,item,cat):
		#print item,cat
		features=self.getfeatures(item)
		#print features,"fffffff"
		#print features,"fff"
		# Increment the count for every feature with this category
		for f in features:
			self.incf(f,cat)
		# Increment the count for this category
		self.incc(cat)
		
		#print self.cc,"ccc",self.fc,"fcc"
	def store_train(self):
		print self.fc,"fc"
		print self.cc,"cc"
		

		doc = {
		    
		    'fc': self.fc,
		    'cc': self.cc
			}
		#res =es.delete(index="twitter",doc_type="training_stats",id="AUvAnMSB-WcpkF1rXlDQ")
		training_stats =es.search(index="twitter",doc_type="training_stats", body={"query": {"match_all": {}}})

		training_stats=training_stats["hits"]["hits"]
		if (len(training_stats)==0):			
			res = es.index(index="twitter", doc_type='training_stats', body=doc)
		else:			
			res = es.index(index="twitter", doc_type='training_stats',id=training_stats[0]["_id"], body=doc)
			

	def fprob(self,f,cat):
		if self.catcount(cat)==0: return 0
		# The total number of times this feature appeared in this
		# category divided by the total number of items in this category
		print "fff",f, "ccc",cat
		print self.fcount(f,cat),"/////////",self.catcount(cat)
		return self.fcount(f,cat)/self.catcount(cat)
	def weightedprob(self,f,cat,prf,weight=1.0,ap=0.5):
		# Calculate current probability
		print self.fc
		basicprob=prf(f,cat)
		print basicprob,"basic"
		# Count the number of times this feature has appeared in
		# all categories
		totals=sum([self.fcount(f,c) for c in self.categories( )])
		# Calculate the weighted average
		bp=((weight*ap)+(totals*basicprob))/(weight+totals)
		return bp

def sampletrain(cl):
	#print "heloo"
	cl.train('Nobody owns the water.','not_spam')
	cl.train('the quick rabbit jumps fences','not_spam')
	cl.train('buy pharmaceuticals now','spam')
	cl.train('make quick money at the online casino','spam')
	cl.train('the quick brown fox jumps','not_spam')


#import docclass


cl=classifier()
#sampletrain(cl)

#sampletrain(cl)
tweet=""
kind=""
i=0
for line in sys.stdin:
  if i==0:
  	i=1
  	tweet=line
  else:
  	kind=line
if kind.strip()=="spam" or kind.strip()=="not_spam":
	cl.train(tweet, kind.strip())
	cl.store_train()
	print "finish training"

if kind.strip()=="predict":
	text_features=(tweet.strip()).split()
	global_weight=0
	for ele in text_features:
		spamprob=cl.weightedprob(ele,'spam',cl.fprob)
		global_weight=global_weight+spamprob

	print global_weight/len(text_features), "is a spam"
#cl.train('this is a robot ','spam')

#cl.train('mobile','spam')
#cl.store_train()
#text.strip()
#weightedprob=cl.weightedprob("mobile",'spam',cl.fprob)
#print weightedprob,"weightedprob"
#prob=cl.fprob('money','good')
#print "prob is:", prob
#print cl.__dict__
#cl.train('the quick brown fox jumps over the lazy dog','good')
#print cl.categories()
#catcount=cl.catcount("good")
#print catcount,"cattt"
#cl.train('make quick money in the online casino','bad')
#fcount=cl.fcount('brown','good')
#print fcount,"fcountt"
