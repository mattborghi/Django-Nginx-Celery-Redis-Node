import time
import redis
from celery import task


redis_client = redis.StrictRedis(host='redis', port=6379, db=0)

# To obtain the task id, we set bind=True
@task(bind=True)
def generate_csv(self):
    # task sleep 10 secs. nginx timeout will be set to 1sec and there will be no problem
    time.sleep(10)
    # dummy url google.com that mimics uploaded csv file
    result = 'http://google.com'
    redis_client.publish(self.request.id, result)
