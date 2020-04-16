package uk.co.zacgarby.roguelike;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

import uk.co.zacgarby.roguelike.world.Level;

public class Main extends ApplicationAdapter {
	public static Player player;
	public static Level level;
	
	public SpriteBatch batch;
	
	@Override
	public void create () {		
		batch = new SpriteBatch();
		
		player = new Player("møøse");
		level = new Level(16, 16);
		
		batch.setProjectionMatrix(batch.getProjectionMatrix().scale(4, 4, 1));
	}

	@Override
	public void render () {
		Gdx.gl.glClearColor(0, 0, 0, 1);
		Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

		batch.begin();
		level.draw(batch, 0, 0);
		Sidebar.draw(batch);
		batch.end();
	}
	
	@Override
	public void dispose () {
		batch.dispose();
		Sidebar.dispose();
	}
}
