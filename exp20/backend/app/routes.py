from flask import Blueprint, jsonify, request

bp = Blueprint('main', __name__)

@bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running'}), 200

@bp.route('/api/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        'success': True,
        'message': 'Test endpoint working',
        'data': {'version': '1.0.0'}
    }), 200

@bp.route('/api/echo', methods=['POST'])
def echo():
    data = request.get_json()
    return jsonify({'echo': data}), 200

@bp.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@bp.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500
