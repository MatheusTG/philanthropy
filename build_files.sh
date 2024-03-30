echo "BUILD START" 
python3.9 -m ensurepip 
python3.9 -m pip install -r requirements.txt
npm install
npx tsc
npx vite build
python3.9 manage.py collectstatic --noinput --clear 
echo "BUILD END"